using ClosedXML.Excel;
using cms_library;
using System;
using System.Data;
using System.IO;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace FriendsTravel.Execl
{
    public partial class excel_import : System.Web.UI.Page
    {
        private clsUtility objUtil = new clsUtility();
        private clsDB objDB = new clsDB();

        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

            }
            else
            {
            }
        }

        protected void Read_exccl(object sender, EventArgs e)
        {
            try
            {
                string pathFile = "";
                if (fileUpload.HasFile)
                {
                    pathFile = saveFile(fileUpload.PostedFile);
                }
                else
                {
                    pathFile = ViewState["filePath"].ToString();
                }

                lblUpload.Text = ViewState["fileName"].ToString();

                IXLWorkbook wb = new XLWorkbook(pathFile);

                ddlSheet.Items.Clear();
                foreach (IXLWorksheet ws in wb.Worksheets)
                {
                    ddlSheet.Items.Add(new ListItem(ws.Name, ws.Position.ToString()));
                }
                if (ddlSheet.Items.Count > 0) { ddlSheet.SelectedIndex = 0; }
                loadData();
            }
            catch (Exception ex)
            {
            }
        }

        private string saveFile(HttpPostedFile file)
        {
            try
            {
                string fileName = fileUpload.FileName;
                string fileType = Path.GetExtension(fileName);
                string fileNameNew = DateTime.Now.ToString("yyMMddHHssfff") + fileType;
                string savePath = Server.MapPath("../upload/execl/") + fileNameNew;
                ViewState["fileName"] = fileName;
                ViewState["filePath"] = savePath;
                fileUpload.SaveAs(savePath);
                return savePath;
            }
            catch (Exception ex)
            {
                return "";
            }
        }

        private void loadData()
        {
            DataTable dtColumn = new DataTable();
            dtColumn.Columns.Add("ColumnName", typeof(String));
            dtColumn.Columns.Add("Position", typeof(String));

            DataTable dtData = new DataTable();
            string pathFile = ViewState["filePath"].ToString();
            IXLWorkbook wb = new XLWorkbook(pathFile);
            int idSheet = Int16.Parse(ddlSheet.SelectedValue);
            var ws = wb.Worksheet(idSheet);

            DataRow drNew;
            var lastCol = ws.LastColumnUsed().RangeAddress.LastAddress.ColumnNumber;
            for (int currentCol = 1; currentCol <= lastCol; currentCol++)
            {
                var value = ws.Cell(1, currentCol).Value.ToString();
                dtData.Columns.Add(value, typeof(String));

                drNew = dtColumn.NewRow();
                drNew[0] = value;
                drNew[1] = currentCol;
                dtColumn.Rows.Add(drNew);
            }


            var lastRow = ws.LastRowUsed().RangeAddress.LastAddress.RowNumber;
            for (int currentRow = 2; currentRow <= lastRow; currentRow++)
            {
                drNew = dtData.NewRow();
                for (int currentCol = 1; currentCol <= lastCol; currentCol++)
                {
                    var value = ws.Cell(currentRow, currentCol).Value.ToString();
                    drNew[currentCol - 1] = value;
                }
                dtData.Rows.Add(drNew);
            }

            if (dtColumn.Rows.Count > 0)
            {
                ViewState["dtColumn"] = dtColumn;
                rptHead.DataSource = dtColumn;
                rptHead.DataBind();
            }
            else
            {
                ViewState["dtColumn"] = null;
                rptHead.DataSource = null;
                rptHead.DataBind();
            }

            if (dtData.Rows.Count > 0)
            {
                lblTotal.Text = dtData.Rows.Count.ToString();
                rptRow.DataSource = dtData;
                rptRow.DataBind();

                ScriptManager.RegisterStartupScript(Page, Page.GetType(), "script", "HideProgress();setTable();", true);
            }
            else
            {
                rptRow.DataSource = null;
                rptRow.DataBind();
            }
        }
        protected void rptRow_ItemDataBound(object sender, RepeaterItemEventArgs e)
        {
            if (e.Item.ItemType == ListItemType.Item || e.Item.ItemType == ListItemType.AlternatingItem)
            {
                //Repeater rptData = (Repeater)e.Item.FindControl("rptData");
                //rptData.DataSource = dt;
                //rptData.DataBind();
                Literal ltData = (Literal)e.Item.FindControl("ltData");

                string str = "";
                DataRowView dr = e.Item.DataItem as DataRowView;
                DataTable dtColumn = (DataTable)ViewState["dtColumn"];
                foreach (DataRow drColumn in dtColumn.Rows)
                {
                    string columnName = drColumn["ColumnName"].ToString();
                    str += "<td>";
                    str += dr[columnName].ToString();
                    str += "</td>";
                }
                ltData.Text = str;
            }
        }

        protected void ddlSheet_SelectedIndexChanged(object sender, EventArgs e)
        {
            loadData();
        }
    }
}