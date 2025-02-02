from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import time
import sys

class CodeChangeHandler(FileSystemEventHandler):
    def __init__(self):
        self.process = None
        self.start_worker()
    
    def start_worker(self):
        if self.process:
            self.process.terminate()
        # worker.py 실행
        self.process = subprocess.Popen([sys.executable, 'src/worker.py'])
    
    def on_modified(self, event):
        if event.src_path.endswith('.py'):
            print(f"Code change detected: {event.src_path}")
            self.start_worker()

def main():
    handler = CodeChangeHandler()
    observer = Observer()
    observer.schedule(handler, path='src', recursive=True)
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        if handler.process:
            handler.process.terminate()
    observer.join()

if __name__ == "__main__":
    main()
