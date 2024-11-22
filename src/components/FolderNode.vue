<template>
  <div class="folder-node">
    <div
      class="folder-node__item"
      :class="{ 'folder-node__item--selected': isSelected }"
      @click="selectFolder"
    >
      <span v-if="hasChildren" class="folder-node__arrow" @click.stop="toggle">
        {{ isOpen ? '▼' : '▶' }}
      </span>
      <span class="folder-node__name" :class="{ 'folder-node__name--parent': hasChildren }">
        {{ folder.name }}
      </span>
    </div>
    <div v-show="isOpen" class="folder-node__children">
      <FolderNode
        v-for="child in folder.children"
        :key="child.id"
        :folder="child"
        :selectedFolderId="selectedFolderId"
        :openFolders="openFolders"
        @select="select"
        @toggle="toggle"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { type Folder } from '@/interfaces';


const props = defineProps<{
  folder: Folder
  selectedFolderId?: number
  openFolders: number[]
}>()

const emit = defineEmits(['select', 'update:openFolders'])

const isOpen = ref(false)

const hasChildren = computed(() => props.folder.children?.length)
const isSelected = computed(() => props.folder.id === props.selectedFolderId)

// Синхронизируем раскрытие с массивом openFolders
watch(
  () => props.openFolders,
  (newFolders) => {
    isOpen.value = newFolders.includes(props.folder.id)
  },
  { immediate: true },
)

const toggle = () => {
  if (hasChildren.value) {
    isOpen.value = !isOpen.value
    const newOpenFolders = isOpen.value
      ? [...props.openFolders, props.folder.id]
      : props.openFolders.filter((id) => id !== props.folder.id)
    emit('update:openFolders', newOpenFolders)
  }
}

const selectFolder = () => {
  emit('select', props.folder)
}

const select = (folder: Folder) => {
  emit('select', folder)
}
</script>


<style scoped>
.folder-node {
  margin-left: 0.5rem;
}

.folder-node__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  transition:
    background-color 0.1s ease,
    color 0.1s ease;
}

.folder-node__item--selected {
  background-color: var(--color-border-hover);
  color: var(--color-heading);
}

.folder-node__arrow {
  font-size: 0.8rem;
}

.folder-node__name {
  display: inline-block;
}

.folder-node__name--parent {
  font-weight: bold;
}

.folder-node__children {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  margin-left: 1rem;
  padding-left: 0.5rem;
  border-left: 1px dashed var(--color-border);
}
</style>
