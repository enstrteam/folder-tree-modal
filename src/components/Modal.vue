<template>
  <div class="modal">
    <div class="modal__backdrop" @click="close"></div>
    <div class="modal__content">
      <header class="modal__header">
        <h2 class="modal__title">{{ title }}</h2>
        <button class="modal__close" @click="close">✕</button>
      </header>
      <main class="modal__body">
        <slot></slot>
      </main>
      <footer class="modal__footer">
        <button class="modal__button" @click="confirm">Ок</button>
        <button class="modal__button modal__button--cancel" @click="close">Закрыть</button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Folder } from '@/interfaces';

const props = defineProps<{
  title: string
  selectedFolder: Folder | undefined
}>()

const emit = defineEmits(['close', 'select'])

const close = () => {
  emit('close') // Просто закрываем модальное окно, без передачи данных
}

const confirm = () => {
  if (props.selectedFolder) {
    emit('select', props.selectedFolder) // Отправляем выбранную папку
  }
  close() // Закрываем модальное окно
}
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
}

.modal__backdrop {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal__content {
  position: relative;
  z-index: 20;
  background: var(--color-background);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 400px;
}

.modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.modal__title {
  font-size: 1.25rem;
  font-weight: bold;
  color: var(--color-heading);
}

.modal__close {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--color-text);
}

.modal__body {
  margin-bottom: 1rem;
}

.modal__footer {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}

.modal__button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: var(--color-background-mute);
  color: var(--color-heading);
}

.modal__button:hover {
  background-color: var(--color-border-hover);
}

</style>
