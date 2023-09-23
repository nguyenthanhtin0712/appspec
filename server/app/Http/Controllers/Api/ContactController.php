<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Collection;
use App\Jobs\SendEmail;
use App\Models\Contact;
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
            if ($perPage) {
                $contact = $contact->paginate($perPage);
            } else {
                $contact = $contact->paginate(10);
            }
        }
        $contactCollection = new Collection($contact);
        return $this->sentSuccessResponse($contactCollection, "Get data success", Response::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function sendMail(Request $request)
    {
        $message = $request->input('message');
        $message = [
            'contact_fullname' => 'Hoàng Gia Bảo',
            'contact_email' => 'musicanime2501@gmail.com',
            'contact_phone' => '0355374322',
            'contact_content' => 'Xin chào thầy em muốn liên hệ thầy để hỏi về vấn đề đăng ký chuyên ngành',
        ];
        $message['subject'] = 'Liên hệ từ trang đăng ký chuyên ngành';
        $message['view'] = 'mails.mail-contact';
        SendEmail::dispatch($message, [
            'musicanime2501@gmail.com'
        ])->delay(now()->addMinute(1));
        return $this->sentSuccessResponse($message, 'SendEmail success', 200);
    }
}
