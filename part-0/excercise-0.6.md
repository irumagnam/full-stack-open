```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>browser: add new note to notes[]
    browser->>browser: redrawNotes()
    
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message":"note created"}
    deactivate server
