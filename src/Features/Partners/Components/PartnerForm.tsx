import { useForm } from "react-hook-form";
import { usePartners } from "../../../Hooks/usePartners";
import { useEffect } from "react";
import type { Partner } from "../../../Types/Partner";

interface PartnerFormProps {
  editingPartner?: Partner | null;
  onCancelEdit?: () => void;
}

type PartnerFormData = {
  partner_name: string;
  primary_email: string;
  primary_phone_number: string;
  address: string;
  default_currency_code: string;
  notes?: string;
  customer_details: {
    customer_type: string;
    payment_term: string;
    credit_limit: string;
  };
  supplier_details: {
    supplier_type: string;
    payment_term: string;
  };
};

export default function PartnerForm({ editingPartner, onCancelEdit }: PartnerFormProps) {
  const { addPartner, updatePartner } = usePartners();

  // ملاحظة: نعطي useForm defaultValues فارغة — سنستخدم reset() عند التبديل
  const { register, handleSubmit, reset } = useForm<PartnerFormData>({
    defaultValues: {
      partner_name: "",
      primary_email: "",
      primary_phone_number: "",
      address: "",
      default_currency_code: "",
      notes: "",
      customer_details: {
        customer_type: "",
        payment_term: "",
        credit_limit: "",
      },
      supplier_details: {
        supplier_type: "",
        payment_term: "",
      },
    },
  });

  // كلّما تغيّر editingPartner نعمل reset بالقيم المناسبة.
  useEffect(() => {
    if (editingPartner) {
      reset({
        partner_name: editingPartner.partner_name ?? "",
        primary_email: editingPartner.primary_email ?? "",
        primary_phone_number: editingPartner.primary_phone_number ?? "",
        address: editingPartner.address ?? "",
        default_currency_code: editingPartner.default_currency_code ?? "",
        notes: editingPartner.notes ?? "",
        customer_details: {
          customer_type: editingPartner.customer_details?.customer_type ?? "",
          payment_term: editingPartner.customer_details?.payment_term ?? "",
          credit_limit:
            editingPartner.customer_details?.credit_limit != null
              ? String(editingPartner.customer_details.credit_limit)
              : "",
        },
        supplier_details: {
          supplier_type: editingPartner.supplier_details?.supplier_type ?? "",
          payment_term: editingPartner.supplier_details?.payment_term ?? "",
        },
      });
    } else {
      // نمرّر object كامل فارغ لضمان تفريغ كل الحقول (بما فيها الـselects)
      reset({
        partner_name: "",
        primary_email: "",
        primary_phone_number: "",
        address: "",
        default_currency_code: "",
        notes: "",
        customer_details: {
          customer_type: "",
          payment_term: "",
          credit_limit: "",
        },
        supplier_details: {
          supplier_type: "",
          payment_term: "",
        },
      });
    }
  }, [editingPartner, reset]);

  const onSubmit = (data: PartnerFormData) => {
    if (editingPartner) {
      updatePartner.mutate(
        { id: editingPartner.id, ...data },
        {
          onSuccess: () => {
            // بعد التحديث نفضي الفورم ونبلّغ الأب ليرجع للحالة الافتراضية
            reset();
            onCancelEdit?.();
            // بدل alert تقدر تضيف توست لاحقاً
            alert("Partner updated successfully!");
          },
        }
      );
    } else {
      addPartner.mutate(data, {
        onSuccess: () => {
          reset();
          alert("Partner added successfully!");
        },
      });
    }
  };

  const handleCancel = () => {
    // نفرّغ الفورم تماماً ونعلم الأب أنّه أوقف التحرير
    reset({
      partner_name: "",
      primary_email: "",
      primary_phone_number: "",
      address: "",
      default_currency_code: "",
      notes: "",
      customer_details: {
        customer_type: "",
        payment_term: "",
        credit_limit: "",
      },
      supplier_details: {
        supplier_type: "",
        payment_term: "",
      },
    });
    onCancelEdit?.();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white shadow rounded-2xl p-6 mb-6 space-y-3 max-w-3xl"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingPartner ? "Edit Partner" : "Add Business Partner"}
      </h2>

      <input {...register("partner_name", { required: true })} placeholder="Partner Name" className="input" />
      <input {...register("primary_email", { required: true })} placeholder="Email" className="input" />
      <input {...register("primary_phone_number", { required: true })} placeholder="Phone Number" className="input" />
      <input {...register("address", { required: true })} placeholder="Address" className="input" />
      <input {...register("default_currency_code", { required: true })} placeholder="Currency Code" className="input" />
      <textarea {...register("notes")} placeholder="Notes" className="input" />

      <h3 className="font-semibold mt-4">Customer Details</h3>

      {/* ملاحظة مهمة: لا تضع value={} هنا — دع reset() يضبط القيمة */}
      <select {...register("customer_details.customer_type", { required: true })} className="input">
        <option value="">Select Customer Type</option>
        <option value="Individual">Individual</option>
        <option value="Corporate">Corporate</option>
        <option value="TravelAgency">TravelAgency</option>
      </select>

      <select {...register("customer_details.payment_term", { required: true })} className="input">
        <option value="">Select Payment Term</option>
        <option value="Direct">Direct</option>
        <option value="Credit">Credit</option>
      </select>

      <input
        {...register("customer_details.credit_limit", { required: true })}
        placeholder="Credit Limit"
        type="number"
        className="input"
      />

      <h3 className="font-semibold mt-4">Supplier Details</h3>

      <select {...register("supplier_details.supplier_type", { required: true })} className="input">
        <option value="">Select Supplier Type</option>
        <option value="AirlineProvider">Airline Provider</option>
        <option value="HotelProvider">Hotel Provider</option>
        <option value="InsuranceProvider">Insurance Provider</option>
        <option value="VisaServiceProvider">Visa Service Provider</option>
        <option value="OtherTravelAgency">Other Travel Agency</option>
      </select>

      <select {...register("supplier_details.payment_term", { required: true })} className="input">
        <option value="">Select Supplier Payment Term</option>
        <option value="Prepaid">Prepaid</option>
        <option value="Credit">Credit</option>
      </select>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          {editingPartner ? "Update Partner" : "Add Partner"}
        </button>

        {editingPartner && (
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
