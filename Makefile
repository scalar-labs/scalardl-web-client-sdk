dist:
	webpack scalardl-web-sdk.js --output-library Scalar -o dist/scalardl-web-sdk.bundle.js
clean:
	rm -r dist/
