from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
import subprocess
import time
import sys
import os
import threading

class CodeChangeHandler(FileSystemEventHandler):
    def __init__(self):
        self.process = None
        self.start_worker()
    
    def start_worker(self):
        script_dir = os.path.dirname(os.path.abspath(__file__))
        worker_path = os.path.join(script_dir, 'worker.py')

        if self.process:
            print("Terminating existing worker...", flush=True)
            self.process.terminate()
            self.process.wait()

        print("Starting new worker process...")
        self.process = subprocess.Popen([sys.executable, worker_path])
    
    def on_modified(self, event):
        if event.src_path.endswith('.py'):
            print(f"Code change detected: {event.src_path}")
            self.start_worker()

def main():
    handler = CodeChangeHandler()
    observer = Observer()
    observer.schedule(handler, path='.', recursive=True)
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
