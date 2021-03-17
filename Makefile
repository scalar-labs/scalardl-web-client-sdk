dist: *.js
	npx webpack ./scalardl-web-client-sdk.js --output-library Scalar -o dist/scalardl-web-client-sdk.bundle.js
clean:
	rm -r dist/
