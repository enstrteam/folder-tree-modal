<template>
  <div class="app">
    <button class="app__open-button" @click="openModal">Открыть</button>
    <p v-if="selectedFolder" class="app__selected-folder">
      Выбрана папка "{{ selectedFolder.name }}" с id: {{ selectedFolder.id }}
    </p>
    <Modal
      v-if="isModalOpen"
      title="Выберите папку"
      @close="closeModal"
      @select="handleSelect"
      :selectedFolder="tempSelectedFolder"
    >
      <FolderTree
        :folders="mockFolders"
        :selectedFolderId="tempSelectedFolder?.id"
        :openFolders="openFolders"
        @update:openFolders="(folders) => (openFolders.values = folders)"
        @select="setTempSelectedFolder"
      />
    </Modal>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import Modal from './components/Modal.vue'
import FolderTree from './components/FolderTree.vue'
import { mockFolders } from './store/mockFolders'
import { type Folder } from './interfaces'


const isModalOpen = ref(false)
const selectedFolder = ref<Folder>()
const tempSelectedFolder = ref<Folder>() // Временная выбранная папка
const openFolders = ref<number[]>([]) // Хранение раскрытых папок

// Функция для вычисления пути до папки
const findFolderPath = (folders: any[], folderId: number, path: number[] = []): number[] | null => {
  for (const folder of folders) {
    const newPath = [...path, folder.id]
    if (folder.id === folderId) return newPath
    if (folder.children) {
      const childPath = findFolderPath(folder.children, folderId, newPath)
      if (childPath) return childPath
    }
  }
  return null
}

const openModal = () => {
  tempSelectedFolder.value = selectedFolder.value // Копируем текущую выбранную папку
  if (tempSelectedFolder.value) {
    const path = findFolderPath(mockFolders, tempSelectedFolder.value.id)
    openFolders.value = path || [] // Открываем дерево до выбранной папки
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  tempSelectedFolder.value = undefined // Сбрасываем временную выбранную папку
}

const handleSelect = () => {
  selectedFolder.value = tempSelectedFolder.value // Обновляем выбранную папку только при подтверждении
  closeModal()
}

const setTempSelectedFolder = (folder: Folder) => {
  tempSelectedFolder.value = folder // Обновляем временную папку
}
</script>



<style scoped>
.app__open-button {
  width: fit-content;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: bold;
  color: var(--color-heading);
  background-color: var(--color-background-mute);
  border: 1px solid var(--color-border);
  border-radius: 4px;
  cursor: pointer;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
}

.app__open-button:hover {
  background-color: var(--color-border-hover);
}

.app__selected-folder {
  margin-top: 1rem;
  font-size: 1rem;
  color: var(--color-text);
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
</style>
