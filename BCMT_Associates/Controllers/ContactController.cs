using BCMT_Associates.Interfaces;
using BCMT_Associates.Models;
using BCMT_Associates.Repository;
using Microsoft.AspNetCore.Mvc;

namespace BCMT_Associates.Controllers
{
	public class ContactController : Controller
	{
		IContact _contactRepository;
		public ContactController(IContact contactRepository) { 
		
			_contactRepository = contactRepository;
		}
        public IActionResult Index()
		{
			// Pass the current static contact information to the admin view
			return View(_contactRepository.GetContact());
		}

		// Edit contact (GET method to load the form inside the modal)
		[HttpGet]
		public IActionResult Edit(int Id)
		{
			return PartialView("_CreateEditContact", _contactRepository.GetContact(Id)); // Returns the modal content
		}

		// Edit contact (POST method to save changes via AJAX)
		[HttpPost]
		public IActionResult Edit(Contact contact)
		{
			if (ModelState.IsValid)
			{
				// Update the static ContactInfo with new values
				_contactRepository.EditContact(contact);

				// Return a success response as JSON
				return Json(new { success = true });
			}

			// Return validation errors if the model state is invalid
			return Json(new { success = false, errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) });
		}

		// API endpoint for AJAX to fetch the latest contact info (used for user view)
		[HttpGet]
		public JsonResult GetContactInfo()
		{
			return Json(_contactRepository.GetContact()); // Returns the updated contact information
		}
	}
}
