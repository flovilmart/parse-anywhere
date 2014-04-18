PARSE_APP=$1
PARSE_APP_NAME=$2
PWD=$(pwd);
export NODE_PATH="$1:$PWD/node_modules/"
echo $NODE_PATH
echo $PWD
NODESCRIPT="$PWD/index.js"
cd $1
forever --minUptime 1000 --spinSleepTime 1000 --watchDirectory $PARSE_APP -w $NODESCRIPT $PARSE_APP $PARSE_APP_NAME 
cd $PWD
