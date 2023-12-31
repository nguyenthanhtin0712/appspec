<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\SendMailRequest;
use App\Http\Resources\Collection;
use App\Jobs\SendEmail;
use App\Models\Contact;
use App\Models\DisplayConfig;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $all = $request->input('all');
        $perPage = $request->input('perPage');
        $query = $request->input('query');
        $id = $request->input('id');
        $sortBy = $request->input('sortBy');
        $sortOrder = $request->input('sortOrder', 'asc');
        $filters = $request->input('filters');
        $contact = Contact::where("contact_isDelete", "0");
        $contact->orderBy('contact_id', 'desc');
        if ($query) {
            $contact->where("contact_content", "LIKE", "%$query%");
        }
        if ($id) {
            $contact->where('contact_id', $id);
        }
        if ($sortBy) {
            $contact->orderBy($sortBy, $sortOrder);
        }
        if ($filters) {
            $filters = json_decode($filters, true);
            if (is_array($filters)) {
                foreach ($filters as $filter) {
                    $id = $filter['id'];
                    $value = $filter['value'];
                    $contact->where($id, 'LIKE', '%' . $value . '%');
                }
            }
        }
        if ($all && $all == true) {
            $contact = $contact->get();
        } else {
            $contact = $contact->paginate($perPage ?? 10);
        }
        $contactCollection = new Collection($contact);
        return $this->sentSuccessResponse($contactCollection, "Get data success", Response::HTTP_OK);
    }

    public function destroy($id)
    {
        $contact = Contact::where('contact_id', $id)->firstOrFail();
        $contact->contact_isDelete = 1;
        $contact->save();
        return $this->sentSuccessResponse($contact, "Delete contact success", Response::HTTP_OK);
    }

    public function sendMail(SendMailRequest $request)
    {
        $admin_email = DisplayConfig::find('email_contact')->config_value;
        $message = $request->input('message');
        $message['subject'] = 'Góp ý và phản hồi của sinh viên (Web hỗ trợ đào tạo)';
        $message['view'] = 'mails.mail-contact';
        SendEmail::dispatch($message, [
            $admin_email
        ])->delay(now()->addMinute(1));
        $message = Contact::create($message);
        return $this->sentSuccessResponse($message, 'SendEmail success', 200);
    }

    public function checkViewContact($id){
        $contact = Contact::where('contact_id', $id)->firstOrFail();
        $contact->contact_check = 1;
        $contact->save();
        return $this->sentSuccessResponse($contact, "Contact check view success", Response::HTTP_OK);
    }
}
