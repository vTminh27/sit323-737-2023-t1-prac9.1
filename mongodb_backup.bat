@echo off

REM Set backup directory
set BACKUP_DIR="C:\path\to\backup\directory"

REM Set MongoDB connection details
set MONGODB_HOST=mongodb-host
set MONGODB_PORT=27017
set MONGODB_USERNAME=mongodb-username
set MONGODB_PASSWORD=mongodb-password
set MONGODB_DATABASE=mongodb-database

REM Generate backup filename with timestamp
set BACKUP_FILENAME=backup_%date:~10,4%%date:~4,2%%date:~7,2%_%time:~0,2%%time:~3,2%%time:~6,2%.tar.gz

REM Perform backup using mongodump
mongodump --host %MONGODB_HOST% ^
          --port %MONGODB_PORT% ^
          --username %MONGODB_USERNAME% ^
          --password %MONGODB_PASSWORD% ^
          --db %MONGODB_DATABASE% ^
          --out %BACKUP_DIR%

REM Compress the backup directory
tar -zcvf %BACKUP_DIR%\%BACKUP_FILENAME% %BACKUP_DIR%\dump

REM Cleanup: Remove the original dump directory
rmdir /s /q %BACKUP_DIR%\dump
