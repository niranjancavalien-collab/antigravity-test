/**
 * MyAnatomy Candidate Career Hub · Storage & Download Manager
 * Provides resilient persistence with in-memory fallback for restricted/private browser environments.
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'myanatomy-candidate-v2';
  let memoryFallback = null;

  // Test if localStorage is supported and accessible
  const isLocalStorageAvailable = () => {
    try {
      const testKey = '__myanatomy_test__';
      window.localStorage.setItem(testKey, '1');
      window.localStorage.removeItem(testKey);
      return true;
    } catch (_) {
      return false;
    }
  };

  const hasStorage = isLocalStorageAvailable();

  const emptyState = () => ({
    version: 2,
    player: null,
    portfolio: null,
    rewards: [],
    saved: [],
    track: 'tech'
  });

  const validateState = (data) => {
    if (!data || typeof data !== 'object') return emptyState();
    return {
      version: 2,
      player: data.player && typeof data.player.name === 'string'
        ? {
            name: String(data.player.name).trim().slice(0, 40),
            stage: String(data.player.stage || 'Student · exploring my options'),
            track: ['tech', 'data', 'design'].includes(data.player.track) ? data.player.track : 'tech'
          }
        : null,
      portfolio: data.portfolio && typeof data.portfolio === 'object' ? data.portfolio : null,
      rewards: Array.isArray(data.rewards) ? [...new Set(data.rewards.filter(r => typeof r === 'string'))] : [],
      saved: Array.isArray(data.saved) ? [...new Set(data.saved.filter(s => typeof s === 'string'))] : [],
      track: ['tech', 'data', 'design'].includes(data.track) ? data.track : 'tech'
    };
  };

  window.AppStorage = {
    load() {
      try {
        if (hasStorage) {
          const raw = window.localStorage.getItem(STORAGE_KEY);
          if (raw) return validateState(JSON.parse(raw));
        } else if (memoryFallback) {
          return validateState(memoryFallback);
        }
      } catch (err) {
        console.warn('MyAnatomy: Using fresh state session', err);
      }
      return emptyState();
    },

    save(state) {
      const validated = validateState(state);
      memoryFallback = validated;
      try {
        if (hasStorage) {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(validated));
        }
        return true;
      } catch (err) {
        console.warn('MyAnatomy: LocalStorage write failed, preserved in memory', err);
        return false;
      }
    },

    download(content, filename, mime = 'text/plain') {
      try {
        const blob = new Blob([content], { type: `${mime};charset=utf-8` });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();
        setTimeout(() => URL.revokeObjectURL(url), 60000);
        return Promise.resolve(true);
      } catch (error) {
        console.error('Download failed:', error);
        return Promise.resolve(false);
      }
    }
  };
})();
