using BCMT_Associates.Models;
using Microsoft.AspNetCore.Mvc;

namespace BCMT_Associates.Controllers
{
    public class NewsController : Controller
    {

         private static List<NewsModel> _newsItems = new List<NewsModel>();
        public IActionResult Index()
        {
            return View(_newsItems);
        }





        // Action to handle editing an existing news item
        [HttpPost]
        public IActionResult AddNews([FromBody] NewsModel news)
        {
            news.Id = _newsItems.Count + 1; // Generate a new ID for the news item
            _newsItems.Add(news); // Add the news item to the list
            return Json(news); // Return the newly added news item as JSON
        }



        [HttpPost]
        public IActionResult EditNews([FromBody] NewsModel updatedNews)
        {
            var existingNews = _newsItems.FirstOrDefault(x => x.Id == updatedNews.Id);
            if (existingNews != null)
            {
                existingNews.Title = updatedNews.Title;
                existingNews.Description = updatedNews.Description;
                existingNews.MediaFilePath = updatedNews.MediaFilePath;
                return Json(existingNews); // Return the updated news item
            }
            return Json(new { success = false });
        }


        [HttpPost]
        public IActionResult DeleteNews([FromBody] int id)
        {
            var newsItem = _newsItems.FirstOrDefault(x => x.Id == id);
            if (newsItem != null)
            {
                _newsItems.Remove(newsItem); // Remove the news item from the list
                return Json(new { success = true });
            }
            return Json(new { success = false });
        }


        [HttpGet]
        public IActionResult GetNewsItem(int id)
        {
            var newsItem = _newsItems.FirstOrDefault(x => x.Id == id); // Fetch the news item from the list by ID

            if (newsItem == null)
            {
                return NotFound(); // Return 404 if the news item is not found
            }

            return Json(newsItem); // Return the news item as a JSON object
        }




    }
}
