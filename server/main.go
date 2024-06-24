package main

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

type ChartData struct {
    Difficulty int `json:"difficulty"`
    Notes []string `json:"notes"`
}

type SongData struct {
    Title  string   `json:"title"`
    Artist string   `json:"artist"`
    BPMS   string   `json:"bpms"`
    Charts []ChartData `json:"charts"`
}

func uploadFileHandler(w http.ResponseWriter, r *http.Request) {
    r.ParseMultipartForm(10 << 20) // Max file size: 10MB

    file, _, err := r.FormFile("file")
    if err != nil {
        http.Error(w, "Error retrieving the file", http.StatusInternalServerError)
        return
    }
    defer file.Close()

    tempFile, err := ioutil.TempFile("uploads", "upload-*.sm")
    if err != nil {
        http.Error(w, "Error creating temporary file", http.StatusInternalServerError)
        return
    }
    defer tempFile.Close()

    fileBytes, err := ioutil.ReadAll(file)
    if err != nil {
        http.Error(w, "Error reading the file", http.StatusInternalServerError)
        return
    }

    tempFile.Write(fileBytes)
    parsedData := parseSMFile(string(fileBytes))

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(parsedData)
}

func parseSMFile(data string) SongData {
    diffPatterns := []string{
        "Challgenge",
        "Hard",
        "Medium",
        "Easy",
    }
    chartStartPatterns := []string{
        "dance-single",
        "dance-double",
        "dance-couple",
        "dance-solo",
    }
    isParsingNotes := false
    lines := strings.Split(data, "\n")
    parsedSongData := SongData{}
    parsedChartData := ChartData{}
    //Find the Song Data
    for _, line := range lines {
        if strings.HasPrefix(line, "#TITLE:") {
            parsedSongData.Title = strings.TrimPrefix(line, "#TITLE:")
            parsedSongData.Title = strings.TrimSpace(parsedSongData.Title)
        } else if strings.HasPrefix(line, "#ARTIST:") {
            parsedSongData.Artist = strings.TrimPrefix(line, "#ARTIST:")
            parsedSongData.Artist = strings.TrimSpace(parsedSongData.Artist)
        } else if strings.HasPrefix(line, "#BPMS:") {
            parsedSongData.BPMS = strings.TrimPrefix(line, "#BPMS:")
            parsedSongData.BPMS = strings.TrimSpace(parsedSongData.BPMS)
        } else if strings.HasPrefix(line, "#NOTES:") {
            break
        }
    }

    //Find the Chart Data
    for _, line := range lines {
        if strings.Contains(line, diffPatterns) {

        }

    fmt.Printf("%v", parsedChartData)
    return parsedSongData
}

func main() {
    router := mux.NewRouter()
    router.HandleFunc("/upload", uploadFileHandler).Methods("POST")

    handler := cors.Default().Handler(router)
    fmt.Println("Server is running on port 5000")
    http.ListenAndServe(":5000", handler)
}
