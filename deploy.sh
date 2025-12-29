#!/bin/bash

# Deployment script for GitHub Pages
# This copies dist contents to a separate deploy directory and prepares for push

set -e

DEPLOY_DIR="deploy"
REPO_URL="https://github.com/guyronhuji/EJComplaints.git"

echo "Building site..."
npm run build

echo "Cleaning deploy directory..."
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

echo "Copying dist contents to deploy directory..."
cp -r * "$DEPLOY_DIR/"

echo "Copying .gitignore for deploy directory..."
echo "# Ignore everything except what we explicitly add
*
!.gitignore
!*
" > "$DEPLOY_DIR/.gitignore"

cd "$DEPLOY_DIR"

if [ ! -d ".git" ]; then
    echo "Initializing git repository in deploy directory..."
    git init
    git branch -M main
    
    echo "Adding remote repository..."
    git remote add origin "$REPO_URL" 2>/dev/null || git remote set-url origin "$REPO_URL"
else
    echo "Git repository already exists in deploy directory"
    git remote set-url origin "$REPO_URL" 2>/dev/null || git remote add origin "$REPO_URL"
fi

echo "Staging all files..."
git add -A

echo ""
echo "Deploy directory is ready!"
echo ""
echo "To commit and push, run:"
echo "  cd deploy"
echo "  git commit -m 'Update site'"
echo "git remote set-url origin git@github.com:guyronhuji/EJComplaints.git"
echo "  git push -u origin main --force"
echo "git remote set-url origin git@github.com:guyronhuji/compform.git"
echo "  git push -u origin main --force"
echo ""
echo "Or review changes first with:"
echo "  cd deploy"
echo "  git status"

