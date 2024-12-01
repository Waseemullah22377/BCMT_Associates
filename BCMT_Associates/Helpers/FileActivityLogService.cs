//using BCMT_Associates.Interfaces;
//using BCMT_Associates.Models;

//namespace BCMT_Associates.Helpers
//{
//   public class FileActivityLogService : IActivityLogService
//{
//    private readonly string _baseLogDirectory;

//    public FileActivityLogService(IConfiguration configuration)
//    {
//        // Base directory for logs, you can set this in appsettings.json or hardcode it
//        _baseLogDirectory = configuration["LogBaseDirectory"] ?? "Logs"; 
//    }

//    public async Task LogAsync(ActivityLog logEntry)
//    {
//        // Create directory path based on current date
//        string dateDirectory = Path.Combine(_baseLogDirectory, DateTime.UtcNow.ToString("yyyy-MM-dd"));
//        Directory.CreateDirectory(dateDirectory);

//        // Create file path based on action type
//        string logFilePath = Path.Combine(dateDirectory, $"{logEntry.Action}.txt");

//        // Log message format
//        var logMessage = $"{logEntry.Timestamp:yyyy-MM-dd HH:mm:ss}\t{logEntry.UserId}\t{logEntry.Description}{Environment.NewLine}";

//        // Write log message to the file
//        await File.AppendAllTextAsync(logFilePath, logMessage);
//    }
//}


//}



using BCMT_Associates.Interfaces;
using BCMT_Associates.Models;

namespace BCMT_Associates.Helpers
{
    public class FileActivityLogService : IActivityLogService
    {
        private readonly string _baseLogDirectory;
        private static readonly object _fileLock = new object();

        public FileActivityLogService(IConfiguration configuration)
        {
            _baseLogDirectory = configuration["LogBaseDirectory"] ?? "Logs";
        }

        public async Task LogAsync(ActivityLog logEntry)
        {
            string dateDirectory = Path.Combine(_baseLogDirectory, DateTime.UtcNow.ToString("yyyy-MM-dd"));
            Directory.CreateDirectory(dateDirectory);

            string logFilePath = Path.Combine(dateDirectory, $"{logEntry.Action}.txt");
            var logMessage = $"{logEntry.Timestamp:yyyy-MM-dd HH:mm:ss}\t{logEntry.UserId}\t{logEntry.Description}{Environment.NewLine}";

            // Lock file writing to ensure thread safety
            lock (_fileLock)
            {
                File.AppendAllText(logFilePath, logMessage);
            }
        }
    }
}

