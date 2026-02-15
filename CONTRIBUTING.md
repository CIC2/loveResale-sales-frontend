# Contributing Guidelines
This guide defines our team’s workflow and coding standards for this private repository.  
Follow these guidelines to ensure consistency, quality, and smooth collaboration.

## Our Git Workflow

We use a specific hybrid workflow designed for continuous integration in our development environment and selective promotion to production. This workflow keeps `main` stable while allowing for integration testing in `dev`.

### Key Branches and Their Roles

*   **`main`**: The source of truth for all production-ready code. Branching for new features starts here.
*   **`dev`**: The integration branch for testing validated features in our staging or development environment.

### The Standard Process

All new features and bug fixes follow this lifecycle:

1.  **Branch Off `main`**: Start all new work by creating a new feature branch (e.g., `feature/TICKET-123`) from the tip of the **`main`** branch. This ensures your changes are based on the latest code currently in production.
2.  **Work and Commit**: Make your changes locally, ensuring all tests pass.
3.  **First Pull Request (PR) to `dev`**:
    *   Open a PR from your `feature/` branch targeting the **`dev`** branch.
    *   This merge allows for integration testing within the development environment.

#### ⚠️Handling Conflicts during the `dev` Merge

If merging your primary `feature/` branch into `dev` presents merge conflicts:

*   **DO NOT** merge `dev` into your primary `feature/` branch directly.
*   **INSTEAD**:
    *   Create a dedicated **child branch** off your feature branch using the prefix `dev-feature/`, maintaining the original name structure (e.g., `dev-feature/TICKET-123`).
    *   Merge the latest `dev` into this new `dev-feature/` child branch and resolve all conflicts there.
    *   Merge this child branch back into the parent `feature/TICKET-123` branch.
    *   Proceed with merging the now conflict-free primary `feature/` branch into `dev`.

4.  **Second Pull Request (PR) to `main`**:
    *   Once the feature is fully tested and approved in the development environment (after successfully merging to `dev`), you then open a *second* PR.
    *   This PR takes the same primary `feature/` branch and targets the **`main`** branch for deployment to production.
    *   After approval, the branch is merged into `main`.

### Handling Hotfixes

For urgent production issues that cannot follow the full cycle:

*   **Hotfixes**: A `hotfix/` branch is created directly from **`main`**. Once fixed and reviewed, it is merged back into `main` immediately, and then also merged into `dev` to ensure the fix is propagated to the development environment.


## Branch Naming Conventions

All branch names should be **descriptive**, **concise**, and use **kebab-case** (lowercase letters with hyphens instead of spaces).  
Each branch **must start with a prefix** that indicates the type of work being done.

If you are working on a ticket from our project management tool (**Jira**), please include the **ticket ID** in your branch name.

### **Prefixes and Examples**

| **Prefix**   | **Type of Work**                         | **Example**                                      |
|---------------|-------------------------------------------|--------------------------------------------------|
| `feature/`    | New features or functionality              | `feature/TICKET-123-user-authentication`         |
| `bugfix/`     | Fixing non-critical bugs                   | `bugfix/incorrect-api-response`                  |
| `hotfix/`     | Critical production fixes                  | `hotfix/security-vulnerability`                  |
| `refactor/`   | Code restructuring or cleanup              | `refactor/improve-database-performance`          |
| `docs/`       | Documentation updates                      | `docs/update-contributing-guide`                 |
| `chore/`      | Maintenance tasks (build config, dependencies, etc.) | `chore/upgrade-npm-dependencies`       |


> ✅ **Tips:**
> - Keep branch names under **60 characters** if possible.  
> - Avoid using special characters other than hyphens.  
> - Always include the **ticket ID** when applicable.
  
##  Commit Message Guidelines

Follow this convention for clear and consistent commit history:

`<type>: <short description>` or `<type>-<ticket-id>: <short description>` 

###  Common Types

| Type | Description |
|------|-------------|
| **feat:** | A new feature |
| **fix:** | A bug fix |
| **docs:** | Documentation updates only |
| **style:** | Code style or formatting changes (no logic changes) |
| **refactor:** | Code restructuring without changing behavior |
| **test:** | Adding or fixing tests |

###  Examples

feat: add appointment scheduling form
fix: correct total price calculation in checkout
docs: update setup instructions in README
style: format profile component with Prettier
refactor: simplify unit comparison logic
test: add tests for user login flow


> ✅ **Tips:**
> - Keep descriptions short (under 72 characters)
> - Use the present tense (e.g., *add*, not *added*).
>  
> Example: `feat: improve search performance` ✅  
> Not: `feat: improved search performance` ❌
