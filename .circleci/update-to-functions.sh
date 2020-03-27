set -e
# latest commit
LATEST_COMMIT=$(git rev-parse HEAD)
# latest commit where functions path was changed
FOLDER_COMMIT=$(git log -1 --format=format:%H --full-diff functions)

if [ $FOLDER_COMMIT = $LATEST_COMMIT ];
then
     echo "functions folder has been updated"
else
     echo "no updates to functions folder"
     circleci-agent step halt
fi
