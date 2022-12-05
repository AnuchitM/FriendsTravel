using cms_library;
using System;
using System.Data;
using System.Web.UI.WebControls;

namespace FriendsTravel.ExperienceRecord
{
    public partial class show_graph : System.Web.UI.Page
    {
        private clsUtility objUtil = new clsUtility();
        private clsDB objDB = new clsDB();

        protected void Page_Load(object sender, EventArgs e)
        {
            BindControl();
        }

        private void BindControl()
        {

            objUtil.DropDownList_Data(ref ddlProvince, "ProvinceCode", "ProvinceName", "Mas_Province", " 1=1  Order by OrderNo asc", true, null);


        }

        private void Loaddata(object sender, EventArgs e)
        {
            ListItemCollection param = new ListItemCollection();
            param.Add(new ListItem("IncID", ""));

            DataTable dt = objDB.ExecucteSql_by_param(string.Format("SELECT ProvinceName,ProvinceCode FROM V_Mas_Province Order By LastUpdate desc"), param);

        }

    }
}