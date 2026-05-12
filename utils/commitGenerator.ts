interface CommitData {
    type: 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'perf' | 'test' | 'build' | 'ci' | 'chore' | 'revert'
    scope: string
    subject: string
    body?: string
    breaking?: boolean
}

const generateCommitMessage = (data: CommitData): string => {
    const breakingText = data.breaking ? '!! BREAKING CHANGE !!' : '';
    const body = data.body ? `\n\n${data.body}` : '';
    
    return `${data.type}(${data.scope}): ${data.subject}${breakingText}${body}`;
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

export const generateTypeScriptCommit = (): string => {
    return generateCommitMessage({
        type: 'feat',
        scope: 'typescript',
        subject: 'implement comprehensive TypeScript typing for entire project',
        body: `- Create comprehensive type definitions in types/index.ts
- Add Component Props types (ActionSubmitProps, HeaderGestorProps, etc.)
- Implement State Management types (StorageState, FormState, etc.)
- Define Event Handler types (PasswordVisibilityHandler, CopyHandler, etc.)
- Add Crypto & Data types (EncryptedData, ImportResult, VaultData)
- Create UI Component types (ButtonProps, ThemeToggleProps, etc.)
- Update LocalContext with proper TypeScript interfaces
- Type ActionSubmit component with proper props and state
- Update Header_Gestor component with HeaderGestorProps
- Add CategoryType union and CategoryButton interface
- Implement Validation Result types (PasswordValidationResult, FileValidationResult)
- Add Utility types (ToastMessage, LoadingState)
- Remove any types and improve type safety throughout application`
    });
};
