var RoleScript = {

    Role:'ad',
    //select new { c.CounterID, d.BranchName, c.counterNumber, c.status,c.BranchCode,c.IP,c.Speaker })
    columns:
        [
            { "data": "id", "name": "id" },

            { "data": "name", "name": "name" },

            { "data": "zoneName", "name": "zoneName" },

            { "data": "organizationName", "name": "organizationName" },

            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    if (data.isActive) {
                        return '<p class="demo"><div class="toggle btn btn-round btn-primary" data-toggle="toggle" style="width: 90.7031px; height: 43.7812px;"><input type="checkbox" id="switch" checked="" data-toggle="toggle" data-onstyle="primary" data-style="btn-round"><div class="toggle-group"><label class="btn btn-primary toggle-on">On</label><label class="btn btn-black active toggle-off">Off</label><span class="toggle-handle btn btn-black"></span></div></div></p>'
                    }
                    else {
                        return '<div class="toggle btn btn-black off btn-round" data-toggle="toggle" style="width: 70.5333px; height: 23.0222px;"><input type="checkbox" id="switch" data-toggle="toggle" data-onstyle="primary" data-style="btn-round" data-parsley-multiple="switch"><div class="toggle-group"><label class="btn btn-primary toggle-on">On</label><label class="btn btn-black active toggle-off">Off</label><span class="toggle-handle btn btn-black"></span></div></div>'
                    }


                }
            },


            {
                "mData": null,
                "bSortable": false,
                "mRender": function (data, type, full) {
                    var Editbutton = '';
                    var DeleteButton = '';
                    if (Common.SessionValues.includes('/Role/Update')) {
                        Common.IsActionAllowed = true;
                        Editbutton = '<button type="button" data-toggle="tooltip" id="' + data.id + '" title="" class="btn btn-link btn-primary btn-lg edit" data-original-title="Edit"> <i class="fa fa-edit"></i> </button>';
                    }
                    if (Common.SessionValues.includes('/Role/Delete')) {
                        Common.IsActionAllowed = true;
                        DeleteButton = '<button type="button" data-toggle="tooltip" title="" id="' + data.id + '" class="btn btn-link btn-danger delete" data-original-title="Remove">  <i class="fa fa-times"></i> </button>';
                    }

                    return '<div class="form-button-action">' + Editbutton + DeleteButton + '</div>'

                }
            }
        ]
    ,
    RenderDataTable: function (role) {
        Common.ShowLoader();
        CrudScript.makeAjaxRequest('POST', '/Role/Index/', null, null).then(function (data) {
            
            var dt = $('.tblmanage').DataTable();
            dt.destroy();
            

            CrudScript.JqueryDataTable('.tblmanage', data, RoleScript.columns);
            Common.HideLoader();

        })
    },

    Save: function (formData,checkedValues, _url) {
        
        Common.ShowLoader();

        $("#form").parsley().validate(),
            $("#form").parsley().isValid() &&
            $.ajax({
                method: 'post',
                processData: false,
                contentType: false,
                cache: false,
                data: formData,
                enctype: 'multipart/form-data',
                url: _url,
                /*  headers: { "Authorization": 'Bearer ' + userToken },*/
                success: function (response) {
                    $('#addRowModal').modal("hide");
                    //Common.SuccessAlert("Saved Successfully");
                    Common.Notification('Success', "Saved Successfully");
                    RoleScript.RenderDataTable();
                    Common.HideLoader();
                }
            });

    },
    Delete: function (Id) {
        Common.ShowLoader();
        Common.DeleteAlert('/Role/Delete/', Id, 'Role', RoleScript, '/Role/Index');
    },
    FillModal: function (data) {

        $('#addRowModal').modal("show");
        $('#ModalTitle').text("Update Area");
        $('.fw-mediumbold').text('Update');
        $('#btnUpdate').css('display', 'block');
        $('#btnAdd').css('display', 'none');
        $('#ID').val(data.id);
        $('#areaName').val(data.name);
        $('#organizationId').val(data.organizationId);
        $('#zoneId').val(data.zoneId);
        if (data.isActive == true) {
            $('#IsActive').prop('checked', true).trigger('change');
            $('#IsActive').val(true);

        }
        else {
            $('#IsActive').val(false);
        }
        
    },
}