import type { Plugin as RollupPlugin } from 'rollup';
import type { Plugin as VitePlugin } from 'vite';

export type Plugin = VitePlugin & RollupPlugin;
