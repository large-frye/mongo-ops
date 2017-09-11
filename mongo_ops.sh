#!/bin/sh

DATE=`date +%Y-%m-%d:%H:%M:%S`
OUTPUT_FILE="dump_${DATE}.json"

function init () {
  PS3="What are you trying to do? "
  options=("Dump" "Restore")
  select opt in "${options[@]}"
  do
    case $opt in 
      "Dump")
        echo "\nPlease provide BUILD_OPTIONS as follows (in order): HOST,USER,PASSWD,PORT
========================================================================="
        read BUILD_OPTIONS
        create_dump_statement $BUILD_OPTIONS
        ;;
      "Restore")
        echo "You selected ${opt}"
        ;;
      *) echo "invalid option";;
    esac
  done
}

function create_dump_statement () {
  BUILD_OPTIONS=$1
  IFS="," read -ra BUILD_ARR <<<"$BUILD_OPTIONS"

  if [ ${#BUILD_ARR[@]} -lt 4 ]
  then
    echo "\nThere are not enough build options to create a valid mongodump."
    exit;
  fi

  HOST=${BUILD_ARR[0]}
  USER=${BUILD_ARR[1]}
  PASSWD=${BUILD_ARR[2]}
  PORT=${BUILD_ARR[3]}

  echo "\nPlease provide the db and collection (DB_OPTIONS) you are trying to access (in order):
DB,COLLECTION (*Collection is optional)
======================================"
  read DB_OPTS
  IFS="," read -ra DB_OPTS_ARRAY <<<"$DB_OPTS"
  DB=${DB_OPTS_ARRAY[0]}
  COLLECTION=${DB_OPTS_ARRAY[1]}
  
  echo "\nEnter a query to limit your data (Optional)
==========================================="
  read QUERY

  if [ ${#DB_OPTS_ARRAY[@]} -lt 1 ]
  then
    echo "\nThere are not enough db options to create a valid mongodump."
    exit;
  fi

  # after all input has been read, confirm by asking user if connection string looks correct
  MONGO_DUMP="mongodump --host ${HOST} --port ${PORT} --username ${USER} --password ${PASSWD} --db ${DB}"

  # if collection, add collection
  if [ ! -z "$COLLECTION" ]
  then
    MONGO_DUMP="$MONGO_DUMP --collection ${COLLECTION}"
  fi

  # if query, add query
  if [ ! -z "$QUERY" ]
  then
    MONGO_DUMP="$MONGO_DUMP --query ${QUERY}"
  fi

  # final argument, output
  MONGO_DUMP="$MONGO_DUMP --out ${OUTPUT_FILE}"

  review_query "${MONGO_DUMP}"
}

function review_query () {
  MONGO_QUERY=$1
  PS3="Review query, does it look correct? ${MONGO_QUERY} "
  options=("Yes" "No")
  select opt in "${options[@]}"
  do
    case $opt in 
      "Yes")
        echo "Executing mongodump... \n"
        eval $MONGO_QUERY
        exit;
        ;;
      "No")
        echo "\n#################
# Starting over #
#################\n"
        init
        ;;
      *) echo "invalid option";;
    esac
  done
}

# start our script
init