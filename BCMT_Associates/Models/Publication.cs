using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BCMT_Associates.Models
{

    public class Publication
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; }

        [Required]
        [StringLength(100)]
        public string? JournalName { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime DatePublished { get; set; }

        [Required]
        [StringLength(20)]
        public string ISSN { get; set; }
        public bool IsVisibleOnMainPage { get; set; }  // New property
		//public Nullable<System.DateTime> CreatedOn { get; set; }
		//public Nullable<int> CreatedBy { get; set; }
		//public Nullable<System.DateTime> UpdatedOn { get; set; }
		//public Nullable<int> UpdatedBy { get; set; }
		//public bool? IsActive { get; set; }
		//public bool? IsDeleted { get; set; }

	}
}
