sleep 2;

FILE="../drawingpageactual.png"

if [ ! -f "$FILE" ]; then
    echo "FAILED: actual.png screenshot does not exist."
    exit 1
fi

diff=`compare -metric AE ../drawingpageexpected.png $FILE null: 2>&1`

echo "Difference between images is $diff."

if [ $diff -gt 3000 ];
then
    echo "FAILED: Difference between images is larger than the allowed 3000.";
    exit 1
else
    echo "PASSED: Images are a match.";
    exit 0
fi;