createFiles() {
  basePath="../src"
  touch "$basePath/Model/m-$1.js"
}

echo "a new module named '$1' will be created ..."

createFiles $1
