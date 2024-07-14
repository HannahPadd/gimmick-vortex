package main

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type SongData struct {
	Title  string      `json:"title"`
	Artist string      `json:"artist"`
	BPMS   string      `json:"bpms"`
	Charts []ChartData `json:"charts"`
}

type ChartData struct {
	ChartHeader      string   `json:"chartHeader"`
	Type             string   `json:"type"`
	Tag              string   `json:"tag"`
	Difficulty       string   `json:"difficulty"`
	DifficultyNumber string   `json:"difficultyNumber"`
	Notes            []string `json:"notes"`
}

func uploadFileHandler(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20) // Max file size: 10MB

	file, _, err := r.FormFile("file")
	if err != nil {
		http.Error(w, "Error retrieving the file", http.StatusInternalServerError)
		return
	}
	defer file.Close()

	tempFile, err := os.CreateTemp("uploads", "upload-*.sm")
	if err != nil {
		http.Error(w, "Error creating temporary file", http.StatusInternalServerError)
		return
	}
	defer tempFile.Close()

	fileBytes, err := io.ReadAll(file)
	if err != nil {
		http.Error(w, "Error reading the file", http.StatusInternalServerError)
		return
	}

	tempFile.Write(fileBytes)
	songData, err := parseSMFile(string(fileBytes))
	if err != nil {
		http.Error(w, "Error parsing the file", http.StatusInternalServerError)
		return
	}

	// Test output
	fmt.Printf("Title: %s\n", songData.Title)
	fmt.Printf("Artist: %s\n", songData.Artist)
	fmt.Printf("BPMS: %s\n", songData.BPMS)
	for _, chart := range songData.Charts {
		fmt.Printf("\nChart Header: %s\n", chart.ChartHeader)
		fmt.Printf("Type: %s\n", chart.Type)
		fmt.Printf("Tag: %s\n", chart.Tag)
		fmt.Printf("Difficulty: %s\n", chart.Difficulty)
		fmt.Printf("Difficulty Tag: %s\n", chart.DifficultyNumber)
		fmt.Println("Notes:")
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(songData)
}

func parseSMFile(data string) (*SongData, error) {
	scanner := bufio.NewScanner(strings.NewReader(data))
	songData := &SongData{}
	var currentType, currentTag, currentDifficulty, currentDifficultyNumber string
	var notes []string
	var metaFields []string
	var inNotesSection bool
	var currentHeader string

	for scanner.Scan() {
		line := scanner.Text()
		line = strings.TrimSpace(line)

		if strings.HasPrefix(line, "#TITLE:") {
			songData.Title = strings.TrimSuffix(strings.TrimPrefix(line, "#TITLE:"), ";")
		} else if strings.HasPrefix(line, "#ARTIST:") {
			songData.Artist = strings.TrimSuffix(strings.TrimPrefix(line, "#ARTIST:"), ";")
		} else if strings.HasPrefix(line, "#BPMS:") {
			songData.BPMS = strings.TrimSuffix(strings.TrimPrefix(line, "#BPMS:"), ";")
		} else if strings.HasPrefix(line, "//---------------") {
			// End of notes section for the previous chart
			currentHeader = line
			if len(notes) > 0 {
				// Add the previous chart data to songData.Charts
				songData.Charts = append(songData.Charts, ChartData{
					ChartHeader:      currentHeader,
					Type:             currentType,
					Tag:              currentTag,
					Difficulty:       currentDifficulty,
					DifficultyNumber: currentDifficultyNumber,
					Notes:            convertNotesToArrayString(notes),
				})
				notes = []string{} // Reset notes for the next chart
				inNotesSection = false
			}
		} else if strings.HasPrefix(line, "#NOTES:") {
			metaFields = []string{}
			inNotesSection = true
			for i := 0; i < 5; i++ {
				scanner.Scan()
				metaFields = append(metaFields, scanner.Text())
			}
			if len(metaFields) >= 5 {
				currentType = trimSuffixColon(metaFields[0])
				currentTag = trimSuffixColon(metaFields[1])
				currentDifficulty = trimSuffixColon(metaFields[2])
				currentDifficultyNumber = trimSuffixColon(metaFields[3])
			}
		} else if inNotesSection {
			if line == ";" {
				notes = append(notes, ",")
			} else {
				notes = append(notes, line)
			}
		}
	}

	// Append the last chart if there are remaining notes
	if len(notes) > 0 {
		songData.Charts = append(songData.Charts, ChartData{
			ChartHeader:      currentHeader,
			Type:             currentType,
			Tag:              currentTag,
			Difficulty:       currentDifficulty,
			DifficultyNumber: currentDifficultyNumber,
			Notes:            convertNotesToArrayString(notes),
		})
	}

	if err := scanner.Err(); err != nil {
		return nil, fmt.Errorf("error reading file: %w", err)
	}

	return songData, nil
}

// convertNotesTo2DArray converts a slice of note lines into a 2D array of strings
// convertNotesToArrayString converts a slice of note lines into a slice of single string note blocks
func convertNotesToArrayString(notes []string) []string {
	var result []string
	var currentBlock []string

	for _, note := range notes {
		if note == "," {
			if len(currentBlock) > 0 {
				result = append(result, strings.Join(currentBlock, "\n")+"\n")
				currentBlock = []string{}
			}
		} else {
			currentBlock = append(currentBlock, note)
		}
	}

	if len(currentBlock) > 0 {
		result = append(result, strings.Join(currentBlock, "\n")+"\n")
	}

	return result
}

func trimSuffixColon(s string) string {
	return strings.TrimSuffix(strings.TrimSpace(s), ":")
}

func main() {
	path := "uploads"
	if _, err := os.Stat(path); errors.Is(err, os.ErrNotExist) {
		err := os.Mkdir(path, os.ModePerm)
		if err != nil {
			log.Println(err)
		}
	}
	router := mux.NewRouter()
	router.HandleFunc("/upload", uploadFileHandler).Methods("POST")
	handler := cors.Default().Handler(router)
	s := &http.Server{
		Addr:           ":5000",
		Handler:        handler,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	fmt.Println("Server is running on", s.Addr)
	log.Fatal(s.ListenAndServe())
}
