# jackfarley.ca

Static website source for jackfarley.ca. The deployable site is in the repository root.

To preview locally, serve the repository root over HTTP so the shared header and footer can load:

```sh
python3 -m http.server 8000
```

The site uses HTML, CSS, and browser-side JavaScript; it does not require PHP. Apache's `.htaccess` handles extensionless URLs and redirects old `.php` URLs. Hosts that do not support `.htaccess` should use the `.html` page paths directly.