<template>
  <div class="folder-tree">
    <FolderNode
      v-for="folder in folders"
      :key="folder.id"
      :folder="folder"
      :selectedFolderId="selectedFolderId"
      :openFolders="openFolders"
      @select="selectFolder"
      @update:openFolders="updateOpenFolders"
    />
  </div>
</template>

<script setup lang="ts">
import FolderNode from './FolderNode.vue'
import { type Folder } from '@/interfaces'

const props = defineProps<{
  folders: Folder[]
  selectedFolderId?: number
  openFolders: number[]
}>()

const emit = defineEmits(['select', 'update:openFolders'])

const selectFolder = (folder: Folder) => {
  emit('select', folder)
}

const updateOpenFolders = (folders: number[]) => {
  emit('update:openFolders', folders)
}
</script>

<style scoped>
.folder-tree {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
</style>
