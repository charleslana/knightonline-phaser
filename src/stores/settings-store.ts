import * as Phaser from 'phaser';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useSettingsStore = defineStore('settings', () => {
  const languageKey = 'language';
  const language = ref(getFromLocalStorage(languageKey, getBrowserLanguage()));
  function getFromLocalStorage(key: string, defaultValue: unknown): unknown {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : defaultValue;
  }
  function saveToLocalStorage(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function setLanguage(value: string) {
    language.value = value;
    saveToLocalStorage(languageKey, value);
  }
  function getBrowserLanguage(): string {
    const lang = navigator.language;
    return lang.startsWith('pt') ? 'pt' : 'en';
  }
  function setDefaultLanguage(scene: Phaser.Scene) {
    scene.translation.changeLanguage(language.value as string);
  }
  return {
    setLanguage,
    setDefaultLanguage,
  };
});
