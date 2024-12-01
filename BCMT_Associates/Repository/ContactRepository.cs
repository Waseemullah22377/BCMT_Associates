using BCMT_Associates.Context;
using BCMT_Associates.Interfaces;
using BCMT_Associates.Models;

namespace BCMT_Associates.Repository
{
	public  class ContactRepository : IContact
	{
		// Static field to store contact information
		private AppDBContext _dbContext;
		public ContactRepository(AppDBContext dbContext) { 
			_dbContext = dbContext;
		}
		public  List<Contact> GetContact(int? id = null ) {
			return _dbContext.Contact.Where(x=> x.Id == id || id == null).ToList();

        }

        public void AddContact(Contact contact)
        {
            var result = _dbContext.Contact.Add(contact);
			_dbContext.SaveChanges();

        }

        public void EditContact(Contact contact)
        {
		
            var result = _dbContext.Contact.Update(contact);
            _dbContext.SaveChanges();

        }

        public void DeleteContact(Contact contact)
        {
            var result = _dbContext.Contact.Remove(contact);
            _dbContext.SaveChanges();

        }




        
	}
}
