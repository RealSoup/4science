export default class UploadAdapter {
    constructor( loader ) {
        // The file loader instance to use during the upload.
        this.loader = loader;
    }

    // Starts the upload process.
    upload() {
        return this.loader.file
            .then( file => new Promise( ( resolve, reject ) => {
                this._initRequest();
                this._initListeners( resolve, reject, file );
                this._sendRequest( file );
            } ) );
    }

    // Aborts the upload process.
    abort() {
        if ( this.xhr ) {
            this.xhr.abort();
        }
    }

    // Initializes the XMLHttpRequest object using the URL passed to the constructor.
    _initRequest() {
        const xhr = this.xhr = new XMLHttpRequest();
        const upload_path = "/api/uploadSimple";
        xhr.open( 'POST', upload_path, true );
        xhr.setRequestHeader('x-csrf-token', document.querySelector('meta[name="csrf-token"]').getAttribute('content'));
        // xhr.responseType = 'json';
    }

    // Initializes XMLHttpRequest listeners.
    _initListeners( resolve, reject, file ) {
        const xhr = this.xhr;
        const loader = this.loader;
        const genericErrorText = `Couldn't upload file: ${ file.name }.`;

        xhr.addEventListener( 'error', () => reject( genericErrorText ) );
        xhr.addEventListener( 'abort', () => reject() );
        xhr.addEventListener( 'load', () => {
            const response = JSON.parse(xhr.response);

            if ( !response || response.error ) {
                return reject( response && response.error ? response.error.message : genericErrorText );
            } else {    //  업로드에 성도했다면
                // let fi_id = document.querySelector('#fi_id').value;
                // document.querySelector('#fi_id').value = fi_id+'|'+response.fi_id;
            }

            
            resolve( 
                { default: response } 
                // {
                //     fi_id: response.fi_id,
                //     urls: {
                //         default: response.url
                //     }
                // }
            );
        } );

        if ( xhr.upload ) {
            xhr.upload.addEventListener( 'progress', evt => {
                if ( evt.lengthComputable ) {
                    loader.uploadTotal = evt.total;
                    loader.uploaded = evt.loaded;
                }
            } );
        }
    }

    // Prepares the data and sends the request.
    _sendRequest( file ) {
        // Prepare the form data.
        const data = new FormData();
        data.append( 'fi_group', 'goods' );
        data.append( 'fi_room', new Date().getFullYear() );
        data.append( 'fi_kind', 'desc' );
        data.append( 'file', file );

        // Send the request.
        this.xhr.send( data );
    }
}
