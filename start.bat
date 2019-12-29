@echo off

pushd %~dp0

where /q node
if errorlevel 1 (
    echo NodeJS does not appear to be installed.
    echo Please install the latest LTS version from https://nodejs.org/

    goto end
)

where /q npm
if errorlevel 1 (
    echo The npm command does not appear to be available.
    echo Please ensure that npm was installed during NodeJS setup.

    goto end
)

if not exist node_modules (
    echo The server's dependencies will now be installed.
    echo This process requires an internet connection and may take some time.
    echo.

    pause
    call npm install

    if errorlevel 1 (
        if exist bin rmdir /q /s bin
        if exist node_modules rmdir /q /s node_modules

        echo Installation failed. Cannot continue.

        goto end
    )

    echo Installation successful, launching server.
    echo.
)

rem Project Diva requires TLSv1.0

set DEBUG=app:*
node --tls-min-v1.0 .\bin\index.js

:end
echo.
pause
