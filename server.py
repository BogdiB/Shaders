from httpwatcher import HttpWatcherServer
from tornado.ioloop import IOLoop

def custom_callback():
    print("Web server reloading!")

server = HttpWatcherServer(
    "./", # serve files from the current folder
    watch_paths = ["./", "./testShader/"], # watch these paths for changes
    on_reload = custom_callback, # optionally specify a custom callback to be called just before the server reloads
    host = "localhost", # bind to localhost
    port = 8000,
    server_base_path = "/", # serve static content from http://127.0.0.1:8000/
    watcher_interval = 1.0, # maximum reload frequency (seconds)
    recursive = True, # watch for changes in the path recursively
    open_browser = True # automatically attempt to open a web browser (default: False for HttpWatcherServer)
)
server.listen()

try:
    # will keep serving until someone hits Ctrl+C
    IOLoop.current().start()
except KeyboardInterrupt:
    print("Shutting down.")
    server.shutdown()