#!/bin/bash

VERSION=$(head -n 1 version.txt)
IFS='.' read -r MAJOR MINOR PATCH <<< "$VERSION"

echo "Old version: v$VERSION"

if [ "$1" == "patch" ]; then
    PATCH=$((PATCH + 1))
elif [ "$1" == "minor" ]; then
    MINOR=$((MINOR + 1))
    PATCH=0
elif [ "$1" == "major" ]; then
    MAJOR=$((MAJOR + 1))
    MINOR=0
    PATCH=0
else
    echo "Usage: $0 [patch|minor|major]"
    exit 1
fi

NEW_VERSION="$MAJOR.$MINOR.$PATCH"
echo $NEW_VERSION > version.txt

echo "New version: v$NEW_VERSION"

git add .
git commit -m "Bump to v$NEW_VERSION"
git tag $NEW_VERSION
git push origin master

surge . https://pribehy2.surge.sh
