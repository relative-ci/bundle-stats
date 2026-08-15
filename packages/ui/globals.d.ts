declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Vite raw import (`import content from './x.md?raw'`)
declare module '*.md?raw' {
  const content: string;
  export default content;
}
