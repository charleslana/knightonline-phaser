<template>
  <div id="game-container"></div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { EventBus } from './EventBus';
import StartGame from './main';
import Phaser from 'phaser';

const scene = ref();
const game = ref();
const reloadPageMode = ref(false);

const emit = defineEmits(['current-active-scene']);

const handleBeforeUnload = (event: BeforeUnloadEvent) => {
  const message = 'Você tem alterações não salvas. Tem certeza de que deseja sair?';
  event.preventDefault();
  return message;
};

const handleResize = () => {
  game.value?.scale.resize(window.innerWidth, window.innerHeight);
};

onMounted(() => {
  game.value = StartGame('game-container');
  EventBus.on('current-scene-ready', (scene_instance: Phaser.Scene) => {
    emit('current-active-scene', scene_instance);
    scene.value = scene_instance;
  });
  if (reloadPageMode.value) {
    window.addEventListener('beforeunload', handleBeforeUnload);
  }
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  if (game.value) {
    game.value.destroy(true);
    game.value = null;
  }
  if (reloadPageMode.value) {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  }
  window.removeEventListener('resize', handleResize);
});

defineExpose({ scene, game });
</script>

<style scoped></style>
