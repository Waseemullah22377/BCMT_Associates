namespace BCMT_Associates.Models
{
    public class NewsModel
    {

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string MediaFilePath { get; set; }  // Store the Base64 string here
    }
}
