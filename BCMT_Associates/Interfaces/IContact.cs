using BCMT_Associates.Models;

namespace BCMT_Associates.Interfaces
{
    public interface IContact
    {
        public List<Contact> GetContact(int? id = null);
        public void AddContact(Contact contact);
        public void EditContact(Contact contact);
        public void DeleteContact(Contact contact);
    }
}
