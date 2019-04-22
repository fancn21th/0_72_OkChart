createFiles() {
  basePath="../src"
  # key components
  cp "./templates/model.js" "$basePath/Model/m-$1.js"
  cp "./templates/view.js" "$basePath/View/v-$1.js"
  cp "./templates/chart.js" "$basePath/View/Chart/c-$1.js"
  cp "./templates/view.js" "$basePath/View/Selector/sel-$1.js"
  # configs
  cp "./templates/config/defaultSelector.js" "$basePath/Config/DefaultSelector/cfg-s-$1.js"
  cp "./templates/config/model.js" "$basePath/Config/Model/cfg-m-$1.js"
  cp "./templates/config/queryConverter.js" "$basePath/Config/QueryConverter/cfg-qc-$1.js"
  cp "./templates/config/selectorFilter.js" "$basePath/Config/SelectorFilter/cfg-sf-$1.js"

  # other files need to be modifed accordingly
  echo "update assets/client.js"
  echo "update assets/index.html"
}

echo "a new module named '$1' will be created ..."

createFiles $1

echo "a new module named '$1' has be created !!!"
