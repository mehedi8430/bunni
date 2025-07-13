import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { CustomerTableActions } from "../Customer/components/CustomerTableActions";
import { useState } from "react";

export default function PaymentPage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleFilterChange = (search: string) => {
    setSearchTerm(search);
    setPage(1);
  };

  return (
    <section className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-[32px]">Payment</h1>

        <div className="flex items-center gap-6">
          <Button variant="primary" size="lg" className="text-lg font-normal">
            <Plus />
            Recurring Billing
          </Button>

          <Button variant="primary" size="lg" className="text-lg font-normal">
            <Plus />
            Virtual Terminal
          </Button>

          <Button variant="primary" size="lg" className="text-lg font-normal">
            <Plus />
            pay by link
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card_container col-span-2 xl:col-span-1">erjerg</div>
        <div className="card_container col-span-2 xl:col-span-1">weqijwef</div>

        <div className="bg-sidebar col-span-2 rounded-2xl py-4">
          <CustomerTableActions
            searchTerm={searchTerm}
            handleFilterChange={handleFilterChange}
          />

          {/* <DataTable
            data={data}
            columns={columns}
            isLoading={isLoading}
            page={page}
            limit={limit}
            total={total}
            onPageChange={setPage}
            onLimitChange={setLimit}
            actions={true}
          /> */}
        </div>
      </div>

      {/* View Details Modal */}
      {/* <DialogModal
        isOpen={isViewOpen}
        onOpenChange={setIsViewOpen}
        title="View Details"
        onCancel={() => setIsViewOpen(false)}
      >
        <CustomerDetails customerId={selectedCustomer?.id || ""} />
      </DialogModal> */}

      {/* Edit Modal with CustomerForm */}
      {/* <DialogModal
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        title={editCustomer.id ? "Edit Customer" : "Add New Customer"}
      >
        <CustomerForm
          customer={editCustomer}
          onClose={() => setIsEditOpen(false)}
          onSave={handleSave}
        />
      </DialogModal> */}

      {/* Delete Alert Dialog */}
      {/* <AlertDialogModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        title="Confirm Delete"
        description="Are you sure you want to delete this customer? This action cannot be undone."
        onConfirm={async () => {
          if (customerToDelete) {
            console.log("Customer To Be Deleted:", customerToDelete);
            // Prepare for future API call if implemented
            setData((prev) =>
              prev.filter((cust) => cust.id !== customerToDelete),
            );
            setTotal((prev) => prev - 1);
            setIsDeleteOpen(false);
            setCustomerToDelete(null);
          }
        }}
      /> */}
    </section>
  );
}
