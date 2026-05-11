interface CommitData {
    type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';
    scope: string;
    subject: string;
    body?: string;
    breaking?: boolean;
}

export const generateCommitMessage = (data: CommitData): string => {
    const { type, scope, subject, body, breaking } = data;
    
    // Formatear el tipo y alcance
    const header = breaking 
        ? `${type}(${scope})!: ${subject}`
        : `${type}(${scope}): ${subject}`;
    
    // Construir el mensaje completo
    let fullMessage = header;
    
    if (body) {
        fullMessage += `\n\n${body}`;
    }
    
    // Agregar footer si es breaking change
    if (breaking) {
        fullMessage += `\n\nBREAKING CHANGE: ${subject}`;
    }
    
    return fullMessage;
};

export const generateCopyPasteCommit = (
    type: CommitData['type'],
    scope: string,
    subject: string,
    body?: string,
    breaking?: boolean
): { commitText: string; gitCommand: string } => {
    const commitData: CommitData = { type, scope, subject, body, breaking };
    const commitText = generateCommitMessage(commitData);
    
    // Generar comando git para copiar y pegar
    const gitCommand = `git commit -m "${commitText.replace(/"/g, '\\"')}"`;
    
    return {
        commitText,
        gitCommand
    };
};

// Tipos de commit comunes con descripciones
export const COMMIT_TYPES = {
    feat: 'Nueva funcionalidad',
    fix: 'Corrección de bug',
    docs: 'Documentación',
    style: 'Cambios de formato (no afectan lógica)',
    refactor: 'Refactorización (no afecta funcionalidad)',
    test: 'Pruebas',
    chore: 'Tareas de mantenimiento'
} as const;

export const generateCommitWithDescription = (
    type: CommitData['type'],
    scope: string,
    subject: string
): string => {
    const typeDescription = COMMIT_TYPES[type];
    return `${type.toUpperCase()}(${scope}): ${subject}\n\n${typeDescription}: ${subject}`;
};

export const generateGitHubCommit = (
    type: CommitData['type'],
    scope: string,
    subject: string,
    body?: string,
    breaking?: boolean
): string => {
    const commitData: CommitData = { type, scope, subject, body, breaking };
    return generateCommitMessage(commitData);
};

export const generatePasswordManagerCommit = (): string => {
    return generateCommitMessage({
        type: 'feat',
        scope: 'password-manager',
        subject: 'implement complete password management system with UI improvements',
        body: `- Add EditPassword component with form for editing existing passwords
- Implement favorite functionality with visual feedback (filled/outline stars)
- Add favorite filter button and filtering logic
- Create comprehensive icon components (Web, App, Card, Lock, Star, etc.)
- Replace all inline SVGs with reusable React components
- Move copy buttons inside input fields for better UX
- Update AddPasswords and EditPassword forms to match filter categories
- Add commit message generator utility for GitHub workflows
- Fix mobile view to show edit/delete buttons
- Add setDataPasswordEdit and setDataPasswordFavorite storage functions
- Implement reset functionality in Exit button to clear memory and logout
- Fix oversized icons and improve visual consistency
- Remove duplicate eye toggle buttons for cleaner interface`
    });
};
