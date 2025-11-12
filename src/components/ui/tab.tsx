export default function Tab() {
  return (
    <>
      <div className="flex justify-center text-gray-500 gap-4 bg-gray-100 p-2 rounded">
        <div className="text-gray-500">
          <label
            className={
              orderStatus === "in-production"
                ? `${activeStatusClass} `
                : "cursor-pointer"
            }
            onClick={() => setOrderStatus("in-production")}
          >
            <input
              type="radio"
              name="status"
              value="in-production"
              className="me-1 hidden"
              checked={orderStatus === "in-production"}
              onChange={() => setOrderStatus("in-production")}
            ></input>
            In Production
          </label>
        </div>
        <div>
          <label
            className={
              orderStatus === "cutting" ? activeStatusClass : "cursor-pointer"
            }
            onClick={() => setOrderStatus("cutting")}
          >
            <input
              type="radio"
              name="status"
              value="cutting"
              className="me-1 hidden"
              checked={orderStatus === "cutting"}
            ></input>
            Cutting
          </label>
        </div>
        <div>
          <label
            className={
              orderStatus === "closing"
                ? activeStatusClass
                : "cursor-pointer w-10"
            }
            onClick={() => setOrderStatus("closing")}
          >
            <input
              type="radio"
              name="status"
              value="closing"
              className="me-1 hidden "
              checked={orderStatus === "closing"}
            ></input>
            Closing
          </label>
        </div>
        <div>
          <label
            className={
              orderStatus === "making" ? activeStatusClass : "cursor-pointer"
            }
            onClick={() => setOrderStatus("making")}
          >
            <input
              type="radio"
              name="status"
              value="making"
              className="me-1 hidden"
              checked={orderStatus === "making"}
            ></input>
            Making
          </label>
        </div>
        <div>
          <label
            className={
              orderStatus === "shipped" ? activeStatusClass : "cursor-pointer"
            }
            onClick={() => setOrderStatus("shipped")}
          >
            <input
              type="radio"
              name="status"
              value="done"
              className="me-1 hidden"
              checked={orderStatus === "shipped"}
            ></input>
            Done
          </label>
        </div>
      </div>
    </>
  )
}
