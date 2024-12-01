using System.ComponentModel.DataAnnotations.Schema;

namespace BCMT_Associates.Models
{
    public class Graduate
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Name { get; set; }
        public DateTime EnrollmentDate { get; set; }
        public string Course { get; set; }
        public string Location { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string CertificationNumber { get; set; }
        public string CNIC { get; set; }
        public string Address { get; set; }
        public string EmergencyContact { get; set; }
		//public Nullable<System.DateTime> CreatedOn { get; set; } = DateTime.Now;
		//public Nullable<int> CreatedBy { get; set; }
		//public Nullable<System.DateTime> UpdatedOn { get; set; } = DateTime.Now;
		//public Nullable<int> UpdatedBy { get; set; }
	
		//public bool? IsActive { get; set; }
		//public bool? IsDeleted { get; set; }
	}
}
