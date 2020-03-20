set -e

# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)

# latest commit where $FOLDER path was changed
FOLDER_COMMIT=$(git log -1 --format=format:%H --full-diff $FOLDER)

if [ $FOLDER_COMMIT = $LATEST_COMMIT ];
then
     echo "files in $FOLDER has changed"
else
     echo "no folders of relevance has changed"
     circleci step halt
fi
