<template>
  <div class="notes-container">
    <div v-for="(row, rowIndex) in notes" :key="rowIndex" class="note-row">
      <div v-for="(note, noteIndex) in row.split('')" :key="noteIndex" class="note-cell">
        <div v-if="note === '1'" class="arrow">
          <!-- You can replace this with an arrow image or icon -->
          &#x25B2;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotesRenderer',
  props: {
    notes: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>
.notes-container {
  display: flex;
  flex-direction: column;
}

.note-row {
  display: flex;
}

.note-cell {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  margin: 1px;
}

.arrow {
  color: red; /* Change this to style your arrow */
}
</style>
