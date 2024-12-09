const TooltipCustom = (field) => {
  return field && field.length > 20 ? (
    <div data-toggle="tooltip" title={field}>
      {field.substring(0, 20)}...
    </div>
  ) : (
    <div>{field}</div>
  );
};

export default TooltipCustom;
