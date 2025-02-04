import time
# import sys

# async def analyze_plugin(file_path: str):
#     # phpstan_result = await run_phpstan(file_path)
#     semgrep_result = await run_semgrep(file_path)
#     return merge_results(phpstan_result, semgrep_result)
#
# async def run_phpstan(file_path: str):
#     cmd = f"./vendor/bin/phpstan analyze {file_path} --error-format=json"
#     result = await run_command(cmd)
#     return parse_phpstan_output(result)
#
# async def run_semgrep(file_path: str):
#     cmd = f"semgrep --config=auto --json {file_path}"
#     result = await run_command(cmd)
#     return parse_semgrep_output(result)

def main():
    print("Worker process started", flush=True)
    count = 1
    while True:
        print("a", flush=True)
        time.sleep(1)


if __name__ == "__main__":
    main()



    
