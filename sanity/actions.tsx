// actions.js

export function CustomActions(props: any) { 
    return {
      label: 'Hello world',
      onHandle: () => {
        // Here you can perform your actions
        window.alert('👋 Hello from custom action')
      }    
    } 
  }