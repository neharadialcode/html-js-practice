var values = [],
  labels = [],
  legends = true,
  legendsElement = $("#TicketByDepartmentLegends"),
  colors = ["#D3B05C", "#9F8865", "#F6CA55"];

$("#TicketByDepartment tr").each(function () {
  values.push(parseInt($("td", this).text()));
  labels.push($("th", this).text());
});

$("#TicketByDepartment").hide();
var r = Raphael("DonutTicketsByDepartment", 200, 200);
r.donutChart(
  100,
  100,
  88,
  55,
  values,
  labels,
  colors,
  legends,
  legendsElement,
  colors
);
