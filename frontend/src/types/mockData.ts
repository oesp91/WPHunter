import { AnalysisResult } from './analysis';

export const mockAnalysisResult: AnalysisResult = {
  status: 'completed',
  plugin_name: 'example-plugin',
  vulnerabilities: [
    {
      type: 'XSS',
      severity: 'high',
      file_path: 'plugin.php',
      line_number: 42,
      description: 'Unescaped user input detected in HTML output',
      code_snippet: 'echo $_GET["user_input"];'
    },
    {
      type: 'SQL Injection',
      severity: 'high',
      file_path: 'admin/settings.php',
      line_number: 23,
      description: 'Direct user input in SQL query',
      code_snippet: '$query = "SELECT * FROM users WHERE id = " . $_GET["id"];'
    },
    {
      type: 'CSRF',
      severity: 'medium',
      file_path: 'includes/form.php',
      line_number: 156,
      description: 'Missing CSRF token validation',
      code_snippet: 'function process_form() { /* No CSRF check */ }'
    }
  ]
};
